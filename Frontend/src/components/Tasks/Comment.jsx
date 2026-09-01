import { Pencil, Save, Trash2 } from "lucide-react";
import { formatDateTime } from "../../utils/date";
import Button from "../Ui/Button";
import TextArea from "../Ui/TextArea";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Comment({ comment, submitUpdateHandler, submitDeleteHandler }) {
    const { user } = useAuth();
    const [clickEdit, setClickEdit] = useState(false);
    const [editComment, setEditComment] = useState(comment?.comment);

    return (
        <>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
                        {comment?.comment_by?.first_name.charAt(0)}
                        {comment?.comment_by?.last_name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <span className="text-sm font-medium text-white">
                                    {comment?.comment_by?.first_name} {comment?.comment_by?.first_name}
                                </span>
                                <span className="ml-2 text-xs text-neutral-500">
                                    {formatDateTime(comment?.createdAt)}
                                </span>
                            </div>
                            {
                                user._id === comment?.comment_by?._id ?
                                (
                                    <div>
                                        {
                                            !clickEdit ? 
                                            (
                                                <Button
                                                    type="button"
                                                    className="rounded-md p-2 text-neutral-500 transition hover:bg-neutral-800 hover:text-white"
                                                    onClick={() => setClickEdit(true)}
                                                >
                                                    <Pencil size={13} />
                                                </Button>
                                            ) : 
                                            (
                                                <Button
                                                    type="button"
                                                    className="rounded-md p-2 text-neutral-500 transition hover:bg-neutral-800 hover:text-white"
                                                    onClick={() => {
                                                        submitUpdateHandler(editComment, comment._id)
                                                        setClickEdit(false);
                                                    }}
                                                >
                                                    <Save size={13} />
                                                </Button>
                                            )
                                        }
                                        <Button
                                            type="button"
                                            className="rounded-md p-2 text-neutral-500 transition hover:bg-neutral-800 hover:text-white"
                                            onClick={() => submitDeleteHandler(comment._id)}
                                        >
                                            <Trash2 size={13} />
                                        </Button>
                                    </div>
                                ) : ""
                            }
                        </div>
                        {
                            clickEdit ?
                                (
                                    <TextArea
                                        rows={3}
                                        placeholder="Write a comment..."
                                        className="w-full resize-none rounded-lg border border-neutral-800 bg-black px-3 py-3 text-sm text-neutral-300 placeholder:text-neutral-600 outline-none transition focus:border-violet-500"
                                        value={editComment}
                                        onChange={(event) => setEditComment(event.target.value)}
                                    />
                                ) :
                                <p className="mt-2 text-sm leading-6 text-neutral-400" id="comment">
                                    {comment?.comment}
                                </p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment;