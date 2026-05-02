package org.cg.dsa_with_vanar_sena.mapping;

import org.cg.dsa_with_vanar_sena.dto.UserResponseDto;
import org.cg.dsa_with_vanar_sena.entity.User;

public class Mapper {
    public static UserResponseDto userToUserResponseDto(User user){
        return new UserResponseDto(user.getUsername(),user.getName(),user.getActive());
    }
}
