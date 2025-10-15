import React from 'react'

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            {completedTasksCount > 0 && (
              <>
                Tuyệt vời bạn đã hoàn thành {completedTasksCount} việc
                {activeTasksCount > 0 && `, còn ${activeTasksCount} việc nữa thôi. CỐ LÊN!!!`}
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>Hãy bắt đầu làm {activeTasksCount} nhiệm vụ thôi nào!</>
            )}
          </p>
        </div>
      )}
    </>
  )
}

export default Footer
