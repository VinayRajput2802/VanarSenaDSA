package org.cg.dsa_with_vanar_sena.controllers;


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
    public ResponseEntity<String> check(@RequestParam String email,@RequestParam String password){
        System.out.println(email+" "+password);
        return new ResponseEntity<String>(loginService.isLogin(email,password), HttpStatus.OK);
    }

    @PostMapping("/forgot")
    public ResponseEntity<String> change(@RequestParam String email,@RequestParam String password,@RequestParam String confirmPassword){
        if (!userService.checkEmail(email)){
            return new ResponseEntity<>("User Not Found",HttpStatus.OK);
        }
        if (!password.equals(confirmPassword)){
            return new ResponseEntity<>("Password and Confirm Password Should be same",HttpStatus.OK);
        }
        String otp = OtpGenerator.generate();
        otpService.saveOtp(email,otp);
        emailService.sendOtp(email,otp);
        System.out.println(email+" "+otp);
        return new ResponseEntity<>("otp sent",HttpStatus.OK);
    }

    @PostMapping("/forgot/change")
    public ResponseEntity<String> isChange(@RequestParam String email,@RequestParam String password,@RequestParam String otp){
        if (!otpService.checkUser(email)){
            return new ResponseEntity<String>("Server Error",HttpStatus.OK);
        }
        if (!otpService.getOtp(email).equals(otp)){
            return new ResponseEntity<String>("Invalid Otp",HttpStatus.OK);
        }
        System.out.println(email+" "+otp+" "+password);
        userService.changePassword(email,password);
        otpService.deleteOtp(email);
        return new ResponseEntity<String>("Done",HttpStatus.OK);
    }

}
