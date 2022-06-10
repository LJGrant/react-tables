import React, { ReactElement } from 'react'

type TableHeadProps = {
  children: ReactElement
  masterCheck: boolean
  onMasterCheck: () => {}
}

const TableHeader: React.FC<TableHeadProps> = ({
  children,
  masterCheck,
  onMasterCheck,
}) => {
  return (
    <thead>
      <tr>
        <th>
          <input
            type="checkbox"
            className="form-check-input"
            checked={masterCheck}
            id="mastercheck"
            onChange={onMasterCheck}
          />
        </th>
        {children}
      </tr>
    </thead>
  )
}

export default TableHeader
