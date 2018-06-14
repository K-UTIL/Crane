package top.kiswich.cranesite.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import top.kiswich.cranesite.pojo.to.TTowerCraneEntity;

@Repository

public interface TowerCraneRepository extends PagingAndSortingRepository<TTowerCraneEntity, Integer> {
    public TTowerCraneEntity findByTowerNumber(Integer towerNumber);
}
