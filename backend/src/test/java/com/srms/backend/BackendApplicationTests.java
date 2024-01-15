package com.srms.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;


import com.srms.backend.model.*;
import com.srms.backend.repository.*;
import java.util.Optional;
import java.util.Set;


@DataJpaTest
class BackendApplicationTests {

	@Autowired
	private TeachesRepository teachesRepository;

	@Autowired
	private CourseRepository courseRepository;

	@Test
	public void saveTeaches() {

		Optional<Course> courseOptional = courseRepository.findById(1);
		// if (courseOptional.isPresent()) {
			// Course course = courseOptional.get();
			Teaches teaches = Teaches.builder()
					.teachesId(1)
					.semester("FALL")
					.teachYear(1200)
					// .courses()
					.build();
			teachesRepository.save(teaches);
		// } else {
		// 	System.out.println("Course not found");

		// }
	}

}
