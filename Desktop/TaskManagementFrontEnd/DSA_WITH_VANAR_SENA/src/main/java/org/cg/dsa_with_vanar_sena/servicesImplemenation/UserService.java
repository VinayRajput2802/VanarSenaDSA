package org.cg.dsa_with_vanar_sena.servicesImplemenation;

import org.cg.dsa_with_vanar_sena.dto.UserResponseDto;
import org.cg.dsa_with_vanar_sena.entity.User;
import org.cg.dsa_with_vanar_sena.enums.Status;
import org.cg.dsa_with_vanar_sena.exception.FoundException;
import org.cg.dsa_with_vanar_sena.exception.NotFoundException;
import org.cg.dsa_with_vanar_sena.mapping.Mapper;
import org.cg.dsa_with_vanar_sena.repository.IUserRepository;
import org.cg.dsa_with_vanar_sena.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    final Map<String,User> userMap = new HashMap<>();
    @Autowired
    IUserRepository userRepository;

    @Override
    public Boolean checkEmail(String email) {
        if (userRepository.existsByEmail(email)){
            return true;
        }
        return false;
    }

    @Override
    public Boolean checkUsername(String username) {
        if (userRepository.existsById(username)){
            return true;
        }
        return false;
    }

    @Override
    public UserResponseDto login(String username, String password) {
        Optional<User> optionalUser = userRepository.findById(username);
        if (optionalUser.isPresent()){
            User user = optionalUser.get();
            if (user.getPassword().equals(password)){
                return Mapper.userToUserResponseDto(user);
            }
            else{
                throw new NotFoundException("password is Incorrect");
            }
        }
        throw new NotFoundException("username is invalid");
    }

    @Override
    public UserResponseDto Create(String username, String password,String email, String name, Status status) {
        Optional<User> optionalUser = userRepository.findById(username);
        if (optionalUser.isPresent()){
            throw new FoundException("username already exists");
        }
        else{
            User user = new User(username,email,password,name,status);
            userRepository.saveAndFlush(user);
            return Mapper.userToUserResponseDto(user);
        }
    }

    @Override
    public void saveUser(String mail, User user) {
        userMap.put(mail,user);
    }



    @Override
    public void deleteUser(String mail) {
        if (userMap.containsKey(mail)) {
            userMap.remove(mail);
        }
    }

    @Override
    public void registerIntoDB(String mail) {
        if (userMap.containsKey(mail)){
            userRepository.saveAndFlush(userMap.get(mail));
        }
    }

    @Override
    public Boolean changePassword(String mail, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(mail);
        if (optionalUser.isPresent()){
            User user = optionalUser.get();
            user.setPassword(password);
            userRepository.saveAndFlush(user);
            return true;
        }
        else{
            throw new RuntimeException("Something Wrong");
        }
    }
}
