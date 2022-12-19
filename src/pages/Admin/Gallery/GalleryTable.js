import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
	deleteGalleryById,
	getAllGallery,
} from "../../../store/actions/gallery-action.js";
import EmptyData from "../../../components/Admin/EmptyData.js";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import Pagination from "../../../components/UI/Pagination.js";
import { showAlert } from "../../../store/slices/ui-slice.js";

const GalleryTable = () => {
	const dispatch = useDispatch();
	const { items, success, error, pagination } = useSelector(
		(state) => state.gallery
	);

	useEffect(() => {
		dispatch(getAllGallery());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [success]);

	useEffect(() => {
		if (success) {
			dispatch(
				showAlert({
					variant: "success",
					message: success,
				})
			);
		}

		if (error) {
			dispatch(
				showAlert({
					variant: "failed",
					message: error,
				})
			);
		}
	}, [dispatch, success, error]);

	const renderRow =
		items?.length === 0 ? (
			<EmptyData />
		) : (
			items?.map((item, index) => {
				let imageUrl = process.env.REACT_APP_STORAGE + item?.image;
				return (
					<tr key={index}>
						<td className="border border-indigo-300 p-2">{item?.title}</td>
						<td className="border border-indigo-300 p-2">
							<a
								className="underline text-blue-500"
								target="_blank"
								href={imageUrl}
								rel="noreferrer"
							>
								{item?.image}
							</a>
						</td>
						<td className="border border-indigo-300 p-2 text-center">
							{item?.created_at}
						</td>
						<td className="border border-indigo-300 border-b-0 p-2 flex flex-row flex-nowrap space-x-1 justify-center items-stretch">
							<Link
								to={`/gallery/update/${item.id}`}
								className="p-3 bg-orange-300 rounded"
							>
								<AiOutlineEdit size={20} />
							</Link>
							<button
								onClick={() => dispatch(deleteGalleryById(item?.id))}
								type="button"
								className="p-3 bg-red-300 rounded"
							>
								<BiTrashAlt size={20} />
							</button>
						</td>
					</tr>
				);
			})
		);

	return (
		<section className="p-4 rounded bg-white">
			<h2 className="mb-3 font-semibold text-xl underline underline-offset-8 text-indigo-900">
				Tabel Dokumentasi Poto
			</h2>
			<div className="mb-3 py-2 inline-flex flex-nowrap overflow-x-auto">
				<Link
					className="px-3 py-2 text-[16px] bg-indigo-900 rounded text-white"
					to="/gallery/add"
				>
					Tambah
				</Link>
			</div>
			<div className="w-full overflow-auto">
				<table className="w-full border-collapse border border-slate-400 table-auto">
					<thead className="bg-indigo-100">
						<tr>
							<th className="border border-indigo-300 p-2">Title</th>
							<th className="border border-indigo-300 p-2">Image</th>
							<th className="border border-indigo-300 p-2">Created At</th>
							<th className="border border-indigo-300 p-2"></th>
						</tr>
					</thead>
					<tbody>{renderRow}</tbody>
				</table>
			</div>
			<Pagination data={pagination} />
		</section>
	);
};

export default GalleryTable;
