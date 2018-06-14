package top.kiswich.cranesite.pojo.to;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "T_USER", schema = "DB_CRANE_CITE", catalog = "")
public class TUserEntity {
    private int id;
    private String username;
    private String password;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public TUserEntity setId(int id) {
        this.id = id;
        return this;
    }

    @Basic
    @Column(name = "username")
    public String getUsername() {
        return username;
    }

    public TUserEntity setUsername(String username) {
        this.username = username;
        return this;
    }

    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public TUserEntity setPassword(String password) {
        this.password = password;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TUserEntity that = (TUserEntity) o;
        return id == that.id &&
                Objects.equals(username, that.username) &&
                Objects.equals(password, that.password);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, username, password);
    }
}
