CREATE TABLE "users" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR UNIQUE NOT NULL,
    "password" VARCHAR NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "user_type_id" INTEGER NOT NULL,
    FOREIGN KEY ("user_type_id") REFERENCES "user_type"("id")
);

CREATE TABLE "classes" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "discipline" VARCHAR NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "schedule_code" INTEGER NOT NULL,
    "professor_id" INTEGER NOT NULL,
    FOREIGN KEY ("schedule_code") REFERENCES "schedule"("code"),
    FOREIGN KEY ("professor_id") REFERENCES "users"("id")
);

CREATE TABLE "schedule" (
    "code" INTEGER NOT NULL PRIMARY KEY,
    "shift_day" VARCHAR
);

CREATE TABLE "enrollment_status" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "enrollment_status" VARCHAR NOT NULL
);

CREATE TABLE "enrollment" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "status_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "classes_id" INTEGER NOT NULL,
    FOREIGN KEY ("status_id") REFERENCES "enrollment_status"("id"),
    FOREIGN KEY ("student_id") REFERENCES "users"("id"),
    FOREIGN KEY ("classes_id") REFERENCES "classes"("id")
);

CREATE TABLE "user_type" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "user_type" VARCHAR NOT NULL
);

INSERT INTO schedule (code, shift_day)
VALUES 
  (21, 'Monday Morning'),
  (22, 'Monday Afternoon'),
  (23, 'Monday Night'),
  (31, 'Tuesday Morning'),
  (32, 'Tuesday Afternoon'),
  (33, 'Tuesday Night'),
  (41, 'Wednesday Morning'),
  (42, 'Wednesday Afternoon'),
  (43, 'Wednesday Night'),
  (51, 'Thursday Morning'),
  (52, 'Thursday Afternoon'),
  (53, 'Thursday Night'),
  (61, 'Friday Morning'),
  (62, 'Friday Afternoon'),
  (63, 'Friday Night');

INSERT INTO user_type (user_type) VALUES ('admin');
INSERT INTO user_type (user_type) VALUES ('student');
INSERT INTO user_type (user_type) VALUES ('teacher');