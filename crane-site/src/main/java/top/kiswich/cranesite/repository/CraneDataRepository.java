package top.kiswich.cranesite.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import top.kiswich.cranesite.pojo.to.TCraneDataEntity;

@Repository
public interface CraneDataRepository extends PagingAndSortingRepository<TCraneDataEntity, Integer> {

}
