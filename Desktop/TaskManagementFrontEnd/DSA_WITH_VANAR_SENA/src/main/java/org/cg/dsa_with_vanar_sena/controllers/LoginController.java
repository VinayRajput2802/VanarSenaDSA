package org.cg.dsa_with_vanar_sena.controllers;


import org.cg.dsa_with_vanar_sena.dto.ForgotOtpRequestDto;
import org.cg.dsa_with_vanar_sena.dto.ForgotPasswordRequestDto;
import org.cg.dsa_with_vanar_sena.dto.LoginRequestDto;
import org.cg.dsa_with_vanar_sena.otp.OtpGenerator;
import org.cg.dsa_with_vanar_sena.services.IEmailService;
import org.cg.dsa_with_vanar_sena.services.ILoginService;
import org.cg.dsa_with_vanar_sena.services.IOtpService;
import org.cg.dsa_with_vanar_sena.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class LoginController {
    @Autowired
    ILoginService loginService;
    @Autowired
    IUserService userService;
    @Autowired
    IOtpService otpService;
    @Autowired
    IEmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<String> check(@RequestBody LoginRequestDto loginRequestDto){
        return new ResponseEntity<String>(loginService.isLogin(loginRequestDto.getEmail(),loginRequestDto.getPassword()), HttpStatus.OK);
    }

    @PostMapping("/forgot")
    public ResponseEntity<String> change(@RequestBody ForgotPasswordRequestDto forgotPasswordRequestDto){
        if (!userService.checkEmail(forgotPasswordRequestDto.getEmail())){
            return new ResponseEntity<>("User Not Found",HttpStatus.OK);
        }
        if (!forgotPasswordRequestDto.getPassword().equals(forgotPasswordRequestDto.getConfirmPassword())){
            return new ResponseEntity<>("Password and Confirm Password Should be same",HttpStatus.OK);
        }
        String otp = OtpGenerator.generate();
        otpService.saveOtp(forgotPasswordRequestDto.getEmail(),otp);
        emailService.sendOtp(forgotPasswordRequestDto.getEmail(),otp);
        return new ResponseEntity<>("otp sent",HttpStatus.OK);
    }

    @PostMapping("/forgot/change")
    public ResponseEntity<String> isChange(@RequestBody ForgotOtpRequestDto forgotOtpRequestDto){
        if (!otpService.checkUser(forgotOtpRequestDto.getEmail())){
            return new ResponseEntity<String>("Server Error",HttpStatus.OK);
        }
        if (!otpService.getOtp(forgotOtpRequestDto.getEmail()).equals(forgotOtpRequestDto.getOtp())){
            return new ResponseEntity<String>("Invalid Otp",HttpStatus.OK);
        }
        userService.changePassword(forgotOtpRequestDto.getEmail(),forgotOtpRequestDto.getPassword());
        otpService.deleteOtp(forgotOtpRequestDto.getEmail());
        return new ResponseEntity<String>("Done",HttpStatus.OK);
    }

}
