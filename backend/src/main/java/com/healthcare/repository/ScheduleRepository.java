package com.healthcare.repository;

import com.healthcare.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
  List<Schedule> findByDoctorId(Long doctorId);

  List<Schedule> findByDoctorIdAndIsActive(Long doctorId, Boolean isActive);

  List<Schedule> findByDoctorIdAndDayOfWeek(Long doctorId, Integer dayOfWeek);
}
