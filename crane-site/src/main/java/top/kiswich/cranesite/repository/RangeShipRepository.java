package top.kiswich.cranesite.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import top.kiswich.cranesite.pojo.to.TRangeShipEntity;

@Repository

public interface RangeShipRepository extends PagingAndSortingRepository<TRangeShipEntity, Integer> {
}
