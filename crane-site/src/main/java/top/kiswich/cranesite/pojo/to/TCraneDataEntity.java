package top.kiswich.cranesite.pojo.to;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "T_CRANE_DATA", schema = "DB_CRANE_CITE", catalog = "")
public class TCraneDataEntity {
    private int id;
    private int craneId;
    private double range;
    private double width;
    private double height;
    private double windSpeed;
    private double weight;
    private double torque;
    private double inclination;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public TCraneDataEntity setId(int id) {
        this.id = id;
        return this;
    }

    @Basic
    @Column(name = "crane_id")
    public int getCraneId() {
        return craneId;
    }

    public TCraneDataEntity setCraneId(int craneId) {
        this.craneId = craneId;
        return this;
    }

    @Basic
    @Column(name = "range")
    public double getRange() {
        return range;
    }

    public TCraneDataEntity setRange(double range) {
        this.range = range;
        return this;
    }

    @Basic
    @Column(name = "width")
    public double getWidth() {
        return width;
    }

    public TCraneDataEntity setWidth(double width) {
        this.width = width;
        return this;
    }

    @Basic
    @Column(name = "height")
    public double getHeight() {
        return height;
    }

    public TCraneDataEntity setHeight(double height) {
        this.height = height;
        return this;
    }

    @Basic
    @Column(name = "wind_speed")
    public double getWindSpeed() {
        return windSpeed;
    }

    public TCraneDataEntity setWindSpeed(double windSpeed) {
        this.windSpeed = windSpeed;
        return this;
    }

    @Basic
    @Column(name = "weight")
    public double getWeight() {
        return weight;
    }

    public TCraneDataEntity setWeight(double weight) {
        this.weight = weight;
        return this;
    }

    @Basic
    @Column(name = "torque")
    public double getTorque() {
        return torque;
    }

    public TCraneDataEntity setTorque(double torque) {
        this.torque = torque;
        return this;
    }

    @Basic
    @Column(name = "inclination")
    public double getInclination() {
        return inclination;
    }

    public TCraneDataEntity setInclination(double inclination) {
        this.inclination = inclination;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TCraneDataEntity that = (TCraneDataEntity) o;
        return id == that.id &&
                craneId == that.craneId &&
                Double.compare(that.range, range) == 0 &&
                Double.compare(that.width, width) == 0 &&
                Double.compare(that.height, height) == 0 &&
                Double.compare(that.windSpeed, windSpeed) == 0 &&
                Double.compare(that.weight, weight) == 0 &&
                Double.compare(that.torque, torque) == 0 &&
                Double.compare(that.inclination, inclination) == 0;
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, craneId, range, width, height, windSpeed, weight, torque, inclination);
    }
}
