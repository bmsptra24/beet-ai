export const ProjectLoading = () => {
  return (
    <tr className="grid pr-3 relative bg-primary-black/10 animate-pulse hover:brightness-95 transition-all ease-in-out cursor-pointer grid-cols-3 rounded">
      <td className="p-2 rounded">&nbsp;</td>
      <td className="p-2">&nbsp;</td>
      <td className="p-2 rounded">&nbsp;</td>
      <td className="absolute right-2 top-0 bottom-0 flex items-center">
        &nbsp;
      </td>
    </tr>
  )
}

export const ProjectNavLoading = () => {
  return (
    <p
      className={`text-sm flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer bg-primary-one/30 animate-pulse border-primary-black`}
    >
      &nbsp;
    </p>
  )
}
