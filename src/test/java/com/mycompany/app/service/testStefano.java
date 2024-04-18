package com.mycompany.app.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.app.domain.Product;
import com.mycompany.app.domain.ProductCategory;
import com.mycompany.app.domain.ProductOrder;
import com.mycompany.app.domain.ShoppingCart;
import com.mycompany.app.domain.enumeration.OrderStatus;
import com.mycompany.app.domain.enumeration.PaymentMethod;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class testStefano {

    private ProductCategory productCategory;
    Long id = 11L;

    @Test
    void createProductCategory() {
        String category = "Consumibles";
        String description = "Para consumir o beber";
        productCategory = new ProductCategory();
        productCategory.setId(id);
        productCategory.setName(category);
        productCategory.setDescription(description);

        assertThat(productCategory).isNotNull();
        assertThat(productCategory.getId()).isEqualTo(id);
        assertThat(productCategory.getName()).isEqualTo(category);
        assertThat(productCategory.getDescription()).isEqualTo(description);
    }

    @Test
    void creteProductOrder() {
        Integer cantidad = 92;
        BigDecimal precio = new BigDecimal(87689.89);
        ProductOrder productOrder = new ProductOrder();
        // Creamos producto para iniciar orden de producto
        Product productNew = new Product();
        productNew.setName("Reloj");
        productNew.setPrice(precio);
        // Creamos carrito
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setPlacedDate(Instant.now());
        shoppingCart.setStatus(OrderStatus.COMPLETED);
        shoppingCart.setTotalPrice(new BigDecimal("215775.98"));
        shoppingCart.setPaymentMethod(PaymentMethod.CREDIT_CARD);
        shoppingCart.setPaymentReference("123456789");
        // Creamos la orden finalmente
        productOrder.setId(id);
        productOrder.setQuantity(cantidad);
        productOrder.setTotalPrice(precio);
        productOrder.setProduct(productNew);
        productOrder.setCart(shoppingCart);
        // Testing
        assertThat(productOrder.getId()).isEqualTo(id);
        assertThat(productOrder.getTotalPrice()).isEqualTo(precio);
        assertThat(productOrder.getProduct()).isEqualTo(productNew);
    }
}
