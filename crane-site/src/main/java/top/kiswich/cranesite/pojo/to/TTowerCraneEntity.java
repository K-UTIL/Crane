package top.kiswich.cranesite.pojo.to;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "T_TOWER_CRANE", schema = "DB_CRANE_CITE", catalog = "")
public class TTowerCraneEntity {
    private int id;
    private int towerNumber;
    private String password;
    private Integer type;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public TTowerCraneEntity setId(int id) {
        this.id = id;
        return this;
    }

    @Basic
    @Column(name = "tower_number")
    public int getTowerNumber() {
        return towerNumber;
    }

    public TTowerCraneEntity setTowerNumber(int towerNumber) {
        this.towerNumber = towerNumber;
        return this;
    }

    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public TTowerCraneEntity setPassword(String password) {
        this.password = password;
        return this;
    }

    @Basic
    @Column(name = "type")
    public Integer getType() {
        return type;
    }

    public TTowerCraneEntity setType(Integer type) {
        this.type = type;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TTowerCraneEntity that = (TTowerCraneEntity) o;
        return id == that.id &&
                towerNumber == that.towerNumber &&
                type == that.type &&
                Objects.equals(password, that.password);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, towerNumber, password, type);
    }
}
