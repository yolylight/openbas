package io.openex.rest.user.form.player;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

public class CreatePlayerInput {

    @Email
    @JsonProperty("user_email")
    private String email;

    @JsonProperty("user_firstname")
    private String firstname;

    @JsonProperty("user_lastname")
    private String lastname;

    @JsonProperty("user_organization")
    private String organizationId;

    @JsonProperty("user_tags")
    private List<String> tagIds = new ArrayList<>();

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(String organizationId) {
        this.organizationId = organizationId;
    }

    public List<String> getTagIds() {
        return tagIds;
    }

    public void setTagIds(List<String> tagIds) {
        this.tagIds = tagIds;
    }
}