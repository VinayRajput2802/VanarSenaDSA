package org.cg.dsa_with_vanar_sena.controllers;

import org.cg.dsa_with_vanar_sena.entity.User;
import org.cg.dsa_with_vanar_sena.enums.Status;
import org.cg.dsa_with_vanar_sena.exception.FoundException;
import org.cg.dsa_with_vanar_sena.exception.InvalidOtpException;
import org.cg.dsa_with_vanar_sena.otp.OtpGenerator;
import org.cg.dsa_with_vanar_sena.services.IEmailService;
import org.cg.dsa_with_vanar_sena.services.IOtpService;
import org.cg.dsa_with_vanar_sena.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class UserController {
    @Autowired
    IEmailService emailService;

    @Autowired
    IOtpService otpService;

    @Autowired
    IUserService userService;

    @PostMapping("/resend")
    public Boolean resendOtp(@RequestParam String email){
        System.out.println(email);
        if (!otpService.checkUser(email)){
            return false;
        }
        else{
            String otp = OtpGenerator.generate();
            otpService.saveOtp(email,otp);
            emailService.sendOtp(email,otp);
            return true;
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> newUser(@RequestParam String username,@RequestParam String email,@RequestParam String password,@RequestParam String name,@RequestParam String confirmPassword){
        if (!password.equals(confirmPassword)){
            throw new RuntimeException("Password and Confirm Password does not match");
        }
        if (userService.checkUsername(username)){
            throw new FoundException("Username Already Exists");
        }
        if (userService.checkEmail(email)){
            throw new FoundException("Email already register");
        }
        String otp = OtpGenerator.generate();
        otpService.saveOtp(email,otp);
        emailService.sendOtp(email,otp);
        userService.saveUser(email,new User(username,email,password,name,Status.ACTIVE));
        return new ResponseEntity<String>("success",HttpStatus.OK);
    }

    @PostMapping("/add/otp")
    public ResponseEntity<Boolean> otpValidation(@RequestParam String email,@RequestParam String otp){
        if (!otpService.getOtp(email).equals(otp)){
            throw new InvalidOtpException("Invalid Otp");
        }
        userService.registerIntoDB(email);
        userService.deleteUser(email);
        otpService.deleteOtp(email);
        return new ResponseEntity<Boolean>(true,HttpStatus.CREATED);
    }
}