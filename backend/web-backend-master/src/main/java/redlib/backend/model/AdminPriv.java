package redlib.backend.model;

import lombok.Data;

@Data
public class AdminPriv {
    private Integer id;

    private Integer adminId;

    private String modId;

    private String priv;
}