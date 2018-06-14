package top.kiswich.cranesite.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import top.kiswich.cranesite.pojo.to.TUserEntity;

@Repository
public interface UserRepository extends PagingAndSortingRepository<TUserEntity, Integer> {
}
