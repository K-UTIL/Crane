package top.kiswich.cranesite.pojo.to;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "T_RANGE_SHIP", schema = "DB_CRANE_CITE", catalog = "")
public class TRangeShipEntity {
    private int id;
    private int craneId;
    private double startAngle;
    private double endAngle;
    private double startRadium;
    private double endRadium;
    private Integer type;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public TRangeShipEntity setId(int id) {
        this.id = id;
        return this;
    }

    @Basic
    @Column(name = "crane_id")
    public int getCraneId() {
        return craneId;
    }

    public TRangeShipEntity setCraneId(int craneId) {
        this.craneId = craneId;
        return this;
    }

    @Basic
    @Column(name = "startAngle")
    public double getStartAngle() {
        return startAngle;
    }

    public TRangeShipEntity setStartAngle(double startAngle) {
        this.startAngle = startAngle;
        return this;
    }

    @Basic
    @Column(name = "endAngle")
    public double getEndAngle() {
        return endAngle;
    }

    public TRangeShipEntity setEndAngle(double endAngle) {
        this.endAngle = endAngle;
        return this;
    }

    @Basic
    @Column(name = "startRadium")
    public double getStartRadium() {
        return startRadium;
    }

    public TRangeShipEntity setStartRadium(double startRadium) {
        this.startRadium = startRadium;
        return this;
    }

    @Basic
    @Column(name = "endRadium")
    public double getEndRadium() {
        return endRadium;
    }

    public TRangeShipEntity setEndRadium(double endRadium) {
        this.endRadium = endRadium;
        return this;
    }

    @Basic
    @Column(name = "type")
    public Integer getType() {
        return type;
    }

    public TRangeShipEntity setType(Integer type) {
        this.type = type;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TRangeShipEntity that = (TRangeShipEntity) o;
        return id == that.id &&
                craneId == that.craneId &&
                Double.compare(that.startAngle, startAngle) == 0 &&
                Double.compare(that.endAngle, endAngle) == 0 &&
                Double.compare(that.startRadium, startRadium) == 0 &&
                Double.compare(that.endRadium, endRadium) == 0 &&
                type == that.type;
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, craneId, startAngle, endAngle, startRadium, endRadium, type);
    }
}
