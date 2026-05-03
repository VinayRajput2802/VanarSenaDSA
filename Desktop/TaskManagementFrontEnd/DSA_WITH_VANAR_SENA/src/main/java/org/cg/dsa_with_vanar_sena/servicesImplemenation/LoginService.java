package org.cg.dsa_with_vanar_sena.servicesImplemenation;

import org.cg.dsa_with_vanar_sena.entity.User;
import org.cg.dsa_with_vanar_sena.exception.NotFoundException;
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
            if (user.getPassword().equals(password)){
                return "success";
            }
            else{
                throw new NotFoundException("Incorrect Password");
            }
        }
        else{
            throw new NotFoundException("User Not Found");
        }
    }
}
