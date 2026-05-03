package org.cg.dsa_with_vanar_sena.controllers;

import org.cg.dsa_with_vanar_sena.dto.SignUpDto;
import org.cg.dsa_with_vanar_sena.dto.SignUpOtpDto;
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
    public ResponseEntity<String> newUser(@RequestBody SignUpDto signUpDto){
        if (!signUpDto.getPassword().equals(signUpDto.getConfirmPassword())){
            return new ResponseEntity<String>("Password and Confirm Password does not match",HttpStatus.OK);

        }
        if (userService.checkUsername(signUpDto.getUsername())){
            return new ResponseEntity<String>("Username Already Exists",HttpStatus.OK);

        }
        if (userService.checkEmail(signUpDto.getEmail())){
            return new ResponseEntity<String>("Email already register",HttpStatus.OK);

        }
        String otp = OtpGenerator.generate();
        otpService.saveOtp(signUpDto.getEmail(), otp);
        emailService.sendOtp(signUpDto.getEmail(),otp);
        userService.saveUser(signUpDto.getEmail(), new User(signUpDto.getUsername(), signUpDto.getEmail(), signUpDto.getPassword(), signUpDto.getName(), Status.ACTIVE));
        return new ResponseEntity<String>("success",HttpStatus.OK);
    }

    @PostMapping("/add/otp")
    public ResponseEntity<Boolean> otpValidation(@RequestBody SignUpOtpDto signUpOtpDto){
        if (!otpService.getOtp(signUpOtpDto.getEmail()).equals(signUpOtpDto.getOtp())){
            throw new InvalidOtpException("Invalid Otp");
        }
        userService.registerIntoDB(signUpOtpDto.getEmail());
        userService.deleteUser(signUpOtpDto.getEmail());
        otpService.deleteOtp(signUpOtpDto.getEmail());
        return new ResponseEntity<Boolean>(true,HttpStatus.CREATED);
    }
}