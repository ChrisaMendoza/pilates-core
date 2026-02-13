package com.pilates.booking.web.rest;

import com.pilates.booking.repository.UserRepository;
import com.pilates.booking.security.SecurityUtils;
import com.pilates.booking.service.MailService;
import com.pilates.booking.service.UserService;
import com.pilates.booking.service.dto.AdminUserDTO;
import com.pilates.booking.service.dto.PasswordChangeDTO;
import com.pilates.booking.web.rest.errors.*;
import com.pilates.booking.web.rest.vm.KeyAndPasswordVM;
import com.pilates.booking.web.rest.vm.ManagedUserVM;
import jakarta.validation.Valid;
import java.util.Objects;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private static class AccountResourceException extends RuntimeException {

        private AccountResourceException(String message) {
            super(message);
        }
    }

    private static final Logger LOG = LoggerFactory.getLogger(AccountResource.class);

    private final UserRepository userRepository;

    private final UserService userService;

    private final MailService mailService;

    public AccountResource(UserRepository userRepository, UserService userService, MailService mailService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.mailService = mailService;
    }

    /**
     * {@code POST  /register} : register the user.
     *
     * @param managedUserVM the managed user View Model.
     * @throws InvalidPasswordException  {@code 400 (Bad Request)} if the password
     *                                   is incorrect.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is
     *                                   already used.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is
     *                                   already used.
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Void> registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM) {
        if (isPasswordLengthInvalid(managedUserVM.getPassword())) {
            throw new InvalidPasswordException();
        }
        return userService.registerUser(managedUserVM, managedUserVM.getPassword())
                .doOnSuccess(mailService::sendActivationEmail).then();
    }

    /**
     * {@code GET  /activate} : activate the registered user.
     *
     * @param key the activation key.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user
     *                          couldn't be activated.
     */
    @GetMapping("/activate")
    public Mono<Void> activateAccount(@RequestParam(value = "key") String key) {
        return userService
                .activateRegistration(key)
                .switchIfEmpty(Mono.error(new AccountResourceException("No user was found for this activation key")))
                .then();
    }

    /**
     * {@code GET  /account} : get the current user.
     * Cette fonction permet de récupérer les informations de l'utilisateur
     * connecté.
     *
     * @return the current user.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user
     *                          couldn't be returned.
     */
    @GetMapping("/account")
    public Mono<AdminUserDTO> getAccount() {
        // Log pour le débuggage : On signale qu'on a reçu une requête
        LOG.debug("REST request to get Account");
        return userService
                .getUserWithAuthorities() // On appelle le service pour chercher l'utilisateur avec ses droits
                .doOnSubscribe(s -> LOG.debug("Subscribed to getUserWithAuthorities")) // Log quand la recherche
                                                                                       // commence
                .doOnSuccess(u -> LOG.debug("User found: {}", u)) // Log quand on a trouvé l'utilisateur
                .doOnError(e -> LOG.error("Error getting user", e)) // Log en cas d'erreur technique
                .map(AdminUserDTO::new) // On transforme l'entité User en objet de transfert (DTO) pour le frontend
                .switchIfEmpty(Mono.error(new AccountResourceException("User could not be found"))); // Erreur si vide
    }

    /**
     * {@code POST  /account} : update the current user information.
     * Cette fonction met à jour les infos (nom, mail...) de l'utilisateur courant.
     *
     * @param userDTO the current user information.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is
     *                                   already used.
     * @throws RuntimeException          {@code 500 (Internal Server Error)} if the
     *                                   user login wasn't found.
     */
    @PostMapping("/account")
    public Mono<Void> saveAccount(@Valid @RequestBody AdminUserDTO userDTO) {
        return SecurityUtils.getCurrentUserLogin() // On récupère le login de l'utilisateur connecté
                .switchIfEmpty(Mono.error(new AccountResourceException("Current user login not found")))
                .flatMap(userLogin -> userRepository
                        .findOneByEmailIgnoreCase(userDTO.getEmail()) // On vérifie si le nouvel email existe déjà
                        .filter(existingUser -> !existingUser.getLogin().equalsIgnoreCase(userLogin))
                        .hasElement()
                        .flatMap(emailExists -> {
                            if (emailExists) {
                                throw new EmailAlreadyUsedException();
                            }
                            return userRepository.findOneByLogin(userLogin);
                        }))
                .switchIfEmpty(Mono.error(new AccountResourceException("User could not be found")))
                .flatMap(user -> userService.updateUser(
                        userDTO.getFirstName(),
                        userDTO.getLastName(),
                        userDTO.getEmail(),
                        userDTO.getLangKey(),
                        userDTO.getImageUrl()));
    }

    /**
     * {@code POST  /account/change-password} : changes the current user's password.
     *
     * @param passwordChangeDto current and new password.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the new
     *                                  password is incorrect.
     */
    @PostMapping(path = "/account/change-password")
    public Mono<Void> changePassword(@RequestBody PasswordChangeDTO passwordChangeDto) {
        if (isPasswordLengthInvalid(passwordChangeDto.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        return userService.changePassword(passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
    }

    /**
     * {@code POST   /account/reset-password/init} : Send an email to reset the
     * password of the user.
     *
     * @param mail the mail of the user.
     */
    @PostMapping(path = "/account/reset-password/init")
    public Mono<Void> requestPasswordReset(@RequestBody String mail) {
        return userService
                .requestPasswordReset(mail)
                .doOnSuccess(user -> {
                    if (Objects.nonNull(user)) {
                        mailService.sendPasswordResetMail(user);
                    } else {
                        // Pretend the request has been successful to prevent checking which emails
                        // really exist
                        // but log that an invalid attempt has been made
                        LOG.warn("Password reset requested for non existing mail");
                    }
                })
                .then();
    }

    /**
     * {@code POST   /account/reset-password/finish} : Finish to reset the password
     * of the user.
     *
     * @param keyAndPassword the generated key and the new password.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is
     *                                  incorrect.
     * @throws RuntimeException         {@code 500 (Internal Server Error)} if the
     *                                  password could not be reset.
     */
    @PostMapping(path = "/account/reset-password/finish")
    public Mono<Void> finishPasswordReset(@RequestBody KeyAndPasswordVM keyAndPassword) {
        if (isPasswordLengthInvalid(keyAndPassword.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        return userService
                .completePasswordReset(keyAndPassword.getNewPassword(), keyAndPassword.getKey())
                .switchIfEmpty(Mono.error(new AccountResourceException("No user was found for this reset key")))
                .then();
    }

    private static boolean isPasswordLengthInvalid(String password) {
        return (StringUtils.isEmpty(password) ||
                password.length() < ManagedUserVM.PASSWORD_MIN_LENGTH ||
                password.length() > ManagedUserVM.PASSWORD_MAX_LENGTH);
    }
}
