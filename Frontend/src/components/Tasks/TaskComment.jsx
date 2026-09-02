import { useState } from "react";
import Button from "../Ui/Button";
import TextArea from "../Ui/TextArea";
import Comment from "./Comment";
import { toast } from "react-toastify";
import { createTaskComment, deleteTaskComment, getAllTaskComment, updateTaskComment } from "../../api/taskComments";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function TaskComment({ taskId }) {
    const { user } = useAuth();
    const [comment, setComment] = useState("");
    const [submitLoader, setSubmitLoader] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await getAllTaskComment(taskId);

            if (response.data.success) {
                setComments(response.data.data);
            }
        };

        fetchComments();
    }, [taskId]);

    const submitCreateHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await createTaskComment(taskId, { comment });
            setComment("");
            if(response.data.success){
                toast.success(response?.data?.message);

                const commentResponse = await getAllTaskComment(taskId);
                setComments(commentResponse.data.data);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setSubmitLoader(false);
        }
    }

    const submitUpdateHandler = async (editComment, id) => {
        try {
            const response = await updateTaskComment(taskId, id, { comment: editComment });
            if(response.data.success){
                toast.success(response?.data?.message);

                const commentResponse = await getAllTaskComment(taskId);
                setComments(commentResponse.data.data);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const submitDeleteHandler = async (id) => {
        try {
            const response = await deleteTaskComment(taskId, id);
            if(response.data.success){
                toast.success(response?.data?.message);

                const commentResponse = await getAllTaskComment(taskId);
                setComments(commentResponse.data.data);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <div className="mt-6 border-t border-neutral-800 pt-6">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Task Comments
                        </h3>
                        <p className="mt-1 text-xs text-neutral-500">
                            Add updates, notes, or discussions related to this task.
                        </p>
                    </div>
                    <span className="rounded-full bg-neutral-800 px-2.5 py-1 text-xs text-neutral-400">
                        {comments?.length} Comments
                    </span>
                </div>

                <div className="space-y-3">
                    {
                        comments?.length ? 
                        comments.map((comment, index) => (<Comment key={index} comment={comment} submitUpdateHandler={submitUpdateHandler} submitDeleteHandler={submitDeleteHandler} />)) :
                        ""
                    }
                </div>

                <form onSubmit={submitCreateHandler}>
                    <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-900/30 p-4">
                        <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-sm font-semibold text-violet-400">
                                {user?.first_name.charAt(0)}
                                {user?.last_name.charAt(0)}
                            </div>

                            <div className="flex-1">
                                <TextArea
                                    rows={3}
                                    placeholder="Write a comment..."
                                    className="w-full resize-none rounded-lg border border-neutral-800 bg-black px-3 py-3 text-sm text-neutral-300 placeholder:text-neutral-600 outline-none transition focus:border-violet-500"
                                    name="comment"
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                />

                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-xs text-neutral-600">
                                        Keep your comment clear and relevant.
                                    </span>
                                    <Button
                                        type="submit"
                                        disabled={submitLoader}
                                        buttonClass="flex items-center justify-center gap-2 rounded-xl py-3"
                                    >
                                        {
                                            submitLoader ? (
                                                <>
                                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                                    Adding Comment...
                                                </>
                                            ) : "Add Comment"
                                        }
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default TaskComment;