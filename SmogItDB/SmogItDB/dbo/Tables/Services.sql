CREATE TABLE [dbo].[Services] (
    [ServiceId]   INT             IDENTITY (1, 1) NOT NULL,
    [ServiceName] VARCHAR (100)   NOT NULL,
    [Description] VARCHAR(200)            NULL,
    [Price]       DECIMAL (10, 2) NOT NULL,
    CONSTRAINT [PK_Services] PRIMARY KEY CLUSTERED ([ServiceId] ASC)
);
