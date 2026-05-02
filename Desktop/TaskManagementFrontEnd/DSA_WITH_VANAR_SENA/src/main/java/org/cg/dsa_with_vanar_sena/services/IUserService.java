package org.cg.dsa_with_vanar_sena.services;

import org.cg.dsa_with_vanar_sena.dto.UserResponseDto;
import org.cg.dsa_with_vanar_sena.entity.User;
import org.cg.dsa_with_vanar_sena.enums.Status;

public interface IUserService {
    public Boolean checkEmail(String email);
    public Boolean checkUsername(String username);
    public UserResponseDto login(String username,String password);
    public UserResponseDto Create(String username, String password, String email, String name, Status status);
    public void saveUser(String mail,User user);
    public void deleteUser(String mail);
    public void registerIntoDB(String mail);
    public Boolean changePassword(String mail,String password);

}
