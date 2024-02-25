package com.bank.bank.model.response;

public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String username;
    private String password;

    private String userId;

    public JwtAuthenticationResponse(String accessToken, String username, String password,String userId) {
        this.accessToken = accessToken;
        this.username = username;
        this.password = password;
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}