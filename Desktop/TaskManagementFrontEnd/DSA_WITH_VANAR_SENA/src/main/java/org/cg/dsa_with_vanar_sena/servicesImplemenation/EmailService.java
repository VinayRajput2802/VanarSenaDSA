package org.cg.dsa_with_vanar_sena.servicesImplemenation;

import org.cg.dsa_with_vanar_sena.services.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements IEmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendOtp(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Code With VanarSena");
        message.setText("Your Otp is : "+otp);
        mailSender.send(message);
    }
}
