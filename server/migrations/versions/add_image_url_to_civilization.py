from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8t11l1989w'  # Use a unique revision ID
down_revision = '7122ff0dcd55'  # Use the ID of the previous migration
branch_labels = None
depends_on = None


def upgrade():
    # Add the image_url column to the civilization table
    op.add_column('civilization', sa.Column('image_url', sa.String(length=255), nullable=True))


def downgrade():
    # Remove the image_url column from the civilization table
    op.drop_column('civilization', 'image_url')
