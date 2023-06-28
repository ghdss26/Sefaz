package com.example.sefaz.back.controller;

import com.example.sefaz.back.dto.request.PersonRequest;
import com.example.sefaz.back.dto.response.PersonResponse;
import com.example.sefaz.back.model.Person;
import com.example.sefaz.back.repository.PersonRepository;
import com.example.sefaz.back.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api_person")
public class PersonController {

    @Autowired
    private PersonService service;

    @Autowired
    private PersonRepository repository;

    @PostMapping("/person")
    public void cadastrar(@RequestBody PersonRequest request) {

        service.registerPerson(request);
    }

    @GetMapping("/persons")
    public List<PersonResponse> listar() {

        return service.searchPersons();
    }

    @GetMapping("/{id}")
    Person getPersonById(@PathVariable Integer id) {

        return service.searchForid(id);
    }

    @DeleteMapping("/{id}")
    public void deletePerson(@PathVariable Integer id) {

        service.removePerson(id);
    }

    @PutMapping("/{id}")
    public PersonResponse updatePerson(@RequestBody PersonRequest request, @PathVariable Integer id) {

        return service.updatePerson(request, id);
    }
}
