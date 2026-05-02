package org.cg.dsa_with_vanar_sena.services;

public interface IOtpService {
    public void saveOtp(String email,String otp);
    public String getOtp(String email);
    public void deleteOtp(String email);
    public Boolean checkUser(String email);
}
