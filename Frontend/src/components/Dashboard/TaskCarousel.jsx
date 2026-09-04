import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TaskSummaryCard from "./TaskSummaryCard";

function TaskCarousel({ tasks = [], overdue = false }) {
    const scrollerRef = useRef(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const updateArrows = () => {
        const el = scrollerRef.current;
        if (!el) return;

        setCanPrev(el.scrollLeft > 8);
        setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    };

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;

        updateArrows();
        el.addEventListener("scroll", updateArrows, { passive: true });
        window.addEventListener("resize", updateArrows);

        return () => {
            el.removeEventListener("scroll", updateArrows);
            window.removeEventListener("resize", updateArrows);
        };
    }, [tasks]);

    const scrollByCard = (direction) => {
        const el = scrollerRef.current;
        if (!el) return;

        const card = el.querySelector("[data-task-card]");
        const amount = card ? card.offsetWidth + 16 : 320;
        el.scrollBy({ left: direction * amount, behavior: "smooth" });
    };

    return (
        <div className="relative w-full min-w-0">
            {canPrev && (
                <button
                    type="button"
                    onClick={() => scrollByCard(-1)}
                    className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-app-line bg-app-card/90 text-app-text shadow-lg transition hover:border-violet-500 hover:bg-violet-600 hover:text-white"
                    aria-label="Previous tasks"
                >
                    <ChevronLeft size={18} />
                </button>
            )}

            {canNext && (
                <button
                    type="button"
                    onClick={() => scrollByCard(1)}
                    className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-app-line bg-app-card/90 text-app-text shadow-lg transition hover:border-violet-500 hover:bg-violet-600 hover:text-white"
                    aria-label="Next tasks"
                >
                    <ChevronRight size={18} />
                </button>
            )}

            <div
                ref={scrollerRef}
                id="taskList"
                className="flex w-full min-w-0 items-stretch gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3"
            >
                {tasks.map((task) => (
                    <div
                        key={task._id || task.task_id}
                        data-task-card
                        className="w-full shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
                    >
                        <TaskSummaryCard task={task} overdue={overdue} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskCarousel;
