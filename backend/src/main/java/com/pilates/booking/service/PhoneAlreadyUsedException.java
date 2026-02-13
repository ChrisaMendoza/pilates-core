package com.pilates.booking.service;

public class PhoneAlreadyUsedException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public PhoneAlreadyUsedException() {
        super("Phone number is already in use!");
    }
}
