package com.pilates.booking.web.rest.errors;

@SuppressWarnings("java:S110") // Inheritance tree of classes should not be too deep
public class PhoneAlreadyUsedException extends ConflictAlertException {

    private static final long serialVersionUID = 1L;

    public PhoneAlreadyUsedException() {
        super(ErrorConstants.PHONE_ALREADY_USED_TYPE, "Phone number is already in use!", "userManagement",
                "phoneAlreadyUsed");
    }
}
