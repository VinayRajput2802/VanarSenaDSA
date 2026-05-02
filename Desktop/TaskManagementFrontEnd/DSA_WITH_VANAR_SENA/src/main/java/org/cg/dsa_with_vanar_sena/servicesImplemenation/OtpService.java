package org.cg.dsa_with_vanar_sena.servicesImplemenation;

import org.cg.dsa_with_vanar_sena.exception.NotFoundException;
import org.cg.dsa_with_vanar_sena.services.IOtpService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class OtpService implements IOtpService {
    final Map<String,String> otpStorage = new HashMap<>();

    @Override
    public void saveOtp(String email, String otp) {
        otpStorage.put(email,otp);
    }

    @Override
    public String getOtp(String email) {
        if (otpStorage.containsKey(email)){
            return otpStorage.get(email);
        }
        else{
            throw new NotFoundException("No Otp Found");
        }
    }



    @Override
    public void deleteOtp(String email) {
        if (otpStorage.containsKey(email)){
            otpStorage.remove(email);
        }
    }

    @Override
    public Boolean checkUser(String email) {
        if (otpStorage.containsKey(email)){
            return true;
        }
        return false;
    }
}
