package top.kiswich.cranesite.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import top.kiswich.cranesite.pojo.to.TRoleEntity;

@Repository

public interface RoleRepository extends PagingAndSortingRepository<TRoleEntity, Integer> {
}
