package com.mycompany.app.service.dto;

public class ProductCategoryDTO {

    private long id;
    private String name;
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setNombre(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "UserDTO{" + "id='" + id + '\'' + ", name='" + name + '\'' + ", description='" + description + '\'' + "}";
    }
}
