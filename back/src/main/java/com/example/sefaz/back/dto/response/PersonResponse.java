package com.example.sefaz.back.dto.response;

import com.example.sefaz.back.model.Person;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class PersonResponse {

    private Integer id;
    private String name;
    private String email;
    private String cpf;
    private String password;
    private String phone;

    public static PersonResponse of(Person person) {

        return PersonResponse.builder()
                .id(person.getId())
                .name(person.getName())
                .email(person.getEmail())
                .cpf(person.getCpf())
                .password(person.getPassword())
                .phone(person.getPhone())
                .build();
    }

    public static List<PersonResponse> of(List<Person> persons) {

        if(persons == null) {

            return null;
        }

        List<PersonResponse> list = new ArrayList<>(persons.size());

        for(Person person : persons) {

            list.add(of (person));
        }

        return list;
    }
}
