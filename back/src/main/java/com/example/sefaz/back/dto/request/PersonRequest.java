package com.example.sefaz.back.dto.request;

import lombok.Data;

@Data
public class PersonRequest {

    private String name;
    private String email;
    private String cpf;
    private String password;
    private String phone;

}
