CREATE TABLE [dbo].[Status] (
    [StatusId]   SMALLINT          NOT NULL,
    [StatusName] VARCHAR (20) NULL,
    CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED ([StatusId] ASC),
    CONSTRAINT [UK_Status_StatusName] UNIQUE NONCLUSTERED ([StatusName] ASC)
);

