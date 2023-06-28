package com.example.sefaz.back.service;

import com.example.sefaz.back.dto.request.PersonRequest;
import com.example.sefaz.back.dto.response.PersonResponse;
import com.example.sefaz.back.model.Person;
import com.example.sefaz.back.repository.PersonRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    @Autowired
    private PersonRepository repository;

    public void registerPerson (PersonRequest request) {

        repository.save(Person.of(request));
    }

    public List<PersonResponse> searchPersons() {

        return PersonResponse.of(repository.findAll());
    }

    public Person searchForid(Integer id) {

        return repository.findById(id).get();
    }

    @Transactional
    public PersonResponse updatePerson(PersonRequest request, Integer id) {
        var person = repository.findById(id).orElseThrow(() -> new RuntimeException("Person not found"));
        BeanUtils.copyProperties(Person.of(request), person, "id");
        return PersonResponse.of(repository.save(person));
    }
    public void removePerson (Integer id) {

        var person = searchForid(id);
        repository.delete(person);
    }


}
