package com.example.be.service;

import com.example.be.model.Images;
import com.example.be.repository.IImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImagesService implements IImagesService{
    @Autowired
    private IImagesRepository imagesRepository;
    @Override
    public List<Images> getImage(Integer id) {
        return imagesRepository.findAllByProductsId(id);
    }
}
