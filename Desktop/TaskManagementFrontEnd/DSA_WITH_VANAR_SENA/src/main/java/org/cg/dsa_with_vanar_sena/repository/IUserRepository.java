package org.cg.dsa_with_vanar_sena.repository;

import org.cg.dsa_with_vanar_sena.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User,String> {
    public boolean existsByEmail(String email);

    public Optional<User> findByEmail(String mail);
}
