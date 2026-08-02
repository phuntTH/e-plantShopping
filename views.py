from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.decorators import login_required

from .models import (
    Course,
    Enrollment,
    Submission,
    Question,
    Choice,
)


@login_required
def submit(request, course_id):
    """
    Create a submission for the current learner and
    save all selected choices.
    """

    if request.method != "POST":
        return redirect("onlinecourse:course_details", course_id=course_id)

    course = get_object_or_404(Course, pk=course_id)

    enrollment = get_object_or_404(
        Enrollment,
        user=request.user,
        course=course,
    )

    submission = Submission.objects.create(
        enrollment=enrollment
    )

    selected_choices = request.POST.getlist("choice")

    for choice_id in selected_choices:
        try:
            choice = Choice.objects.get(pk=int(choice_id))
            submission.choices.add(choice)
        except Choice.DoesNotExist:
            pass

    submission.save()

    return redirect(
        "onlinecourse:show_exam_result",
        course_id=course.id,
        submission_id=submission.id,
    )


@login_required
def show_exam_result(request, course_id, submission_id):
    """
    Calculate exam score and display the result page.
    """

    course = get_object_or_404(Course, pk=course_id)

    submission = get_object_or_404(
        Submission,
        pk=submission_id,
    )

    questions = Question.objects.filter(course=course)

    total_grade = 0
    obtained_grade = 0

    for question in questions:

        total_grade += question.grade

        correct_choices = set(
            question.choices.filter(is_correct=True)
        )

        submitted_choices = set(
            submission.choices.filter(question=question)
        )

        if correct_choices == submitted_choices:
            obtained_grade += question.grade

    score = 0

    if total_grade > 0:
        score = round(
            (obtained_grade / total_grade) * 100,
            2,
        )

    context = {
        "course": course,
        "submission": submission,
        "score": score,
        "questions": questions,
    }

    return render(
        request,
        "onlinecourse/exam_result_bootstrap.html",
        context,
    )
