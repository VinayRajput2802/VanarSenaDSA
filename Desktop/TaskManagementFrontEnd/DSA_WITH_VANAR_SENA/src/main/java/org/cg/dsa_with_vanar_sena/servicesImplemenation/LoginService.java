package org.cg.dsa_with_vanar_sena.servicesImplemenation;

import org.cg.dsa_with_vanar_sena.entity.User;
import org.cg.dsa_with_vanar_sena.repository.IUserRepository;
import org.cg.dsa_with_vanar_sena.services.ILoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService implements ILoginService {
    @Autowired
    IUserRepository userRepository;
    @Override
    public String isLogin(String mail, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(mail);
        if (optionalUser.isPresent()){
            User user = optionalUser.get();
            System.out.println(user.getName());
            System.out.println(user.getPassword()+" "+password);
            if (user.getPassword().equals(password)){
                return "success";
            }
            else{
                return "password not match";
            }
        }
        else{
            return "user not found";
        }
    }
}
