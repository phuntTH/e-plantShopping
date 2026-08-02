from django.db import models
from django.contrib.auth.models import User


class Instructor(models.Model):
    full_time = models.BooleanField(default=True)
    total_learners = models.IntegerField(default=0)

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.user.first_name + "," + self.user.last_name


class Learner(models.Model):
    occupation = models.CharField(max_length=200, blank=False)

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.user.first_name + "," + self.user.last_name


class Course(models.Model):
    name = models.CharField(max_length=200)
    image = models.URLField()
    description = models.TextField()
    pub_date = models.DateField(auto_now_add=True)

    instructors = models.ManyToManyField(
        Instructor,
        related_name="courses",
    )

    users = models.ManyToManyField(
        User,
        through='Enrollment',
    )

    total_enrollment = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Lesson(models.Model):
    title = models.CharField(max_length=200)
    order = models.IntegerField(default=0)
    content = models.TextField()

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.title


class Enrollment(models.Model):
    NORMAL = 'N'
    HONORS = 'H'

    MODES = (
        (NORMAL, 'Normal'),
        (HONORS, 'Honors'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
    )

    date_enrolled = models.DateField(auto_now_add=True)

    mode = models.CharField(
        max_length=1,
        choices=MODES,
        default=NORMAL,
    )

    rating = models.FloatField(default=5.0)


# ==========================
# Final Project Models
# ==========================

class Question(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
    )

    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    question_text = models.CharField(max_length=500)

    grade = models.IntegerField(default=1)

    def __str__(self):
        return self.question_text


class Choice(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="choices",
    )

    choice_text = models.CharField(max_length=300)

    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.choice_text


class Submission(models.Model):
    enrollment = models.ForeignKey(
        Enrollment,
        on_delete=models.CASCADE,
    )

    choices = models.ManyToManyField(Choice)

    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Submission {self.id}"
