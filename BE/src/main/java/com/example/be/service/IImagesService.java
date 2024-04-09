package com.example.be.service;

import com.example.be.model.Images;

import java.util.List;

public interface IImagesService {
    List<Images> getImage(Integer id);
}
