package top.kiswich.cranesite.pojo.to;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "T_ROLE", schema = "DB_CRANE_CITE", catalog = "")
public class TRoleEntity {
    private int id;
    private String name;
    private String desc;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public TRoleEntity setId(int id) {
        this.id = id;
        return this;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public TRoleEntity setName(String name) {
        this.name = name;
        return this;
    }

    @Basic
    @Column(name = "desc")
    public String getDesc() {
        return desc;
    }

    public TRoleEntity setDesc(String desc) {
        this.desc = desc;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TRoleEntity that = (TRoleEntity) o;
        return id == that.id &&
                Objects.equals(name, that.name) &&
                Objects.equals(desc, that.desc);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, name, desc);
    }
}
