CREATE TABLE [dbo].[Users] (
    [UserId]    INT     IDENTITY(1,1)   NOT NULL,
    [Login]     VARCHAR (50)  NOT NULL,
    [FirstName] VARCHAR (50)  NOT NULL,
    [LastName]  VARCHAR (50)  NULL,
    [Email]     VARCHAR (100) NOT NULL,
    [Password]  VARCHAR (255) NULL,
    [CreatedAt] DATETIME      CONSTRAINT [DF_Users_CreatedAt] DEFAULT (getdate()) NULL,
    [Active] BIT NOT NULL, 
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([UserId] ASC),
    CONSTRAINT [UK_Users_Login] UNIQUE NONCLUSTERED ([Login] ASC)
);
