ALTER TABLE group_configs ADD COLUMN has_roles boolean DEFAULT false;
ALTER TABLE group_users DROP COLUMN IF EXISTS group_role_id;

-- Create new table for group user-role relation
CREATE TABLE IF NOT EXISTS group_user_roles (
    group_id BIGINT REFERENCES groups(id),
    user_id BIGINT REFERENCES users(user_id),
    group_role_id BIGINT REFERENCES group_roles(id),
    PRIMARY KEY (group_id, user_id, group_role_id)
);

CREATE INDEX group_user_roles_group_id_key ON group_user_roles (group_id);
CREATE INDEX group_user_roles_user_id_key ON group_user_roles (user_id);
CREATE INDEX group_user_roles_group_role_id_key ON group_user_roles (group_role_id);
