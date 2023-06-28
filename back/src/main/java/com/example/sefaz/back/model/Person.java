package com.example.sefaz.back.model;

import com.example.sefaz.back.dto.request.PersonRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Builder // Gerar um Objeto com a classe
@Data  // Fazer Get, Set e To String
@Entity // Para dizer uma Entidade
@AllArgsConstructor // Cria um construtor com todos os argumentos
@NoArgsConstructor // Cria um construtor sem nenhum argumento
@Table(name = "person")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "name", length = 45)
    private String name;

    @Column(name = "email", length = 45)
    private String email;

    @Column(name = "cpf", length = 45)
    private String cpf;

    @Column(name = "password", length = 45)
    private String password;

    @Column(name = "phone", length = 45)
    private String phone;

    public Person (Integer id) {

        this.id = id;
    }

    public static Person of(PersonRequest request) {

        var person = new Person();

        BeanUtils.copyProperties(request, person);

        return person;
    }

}
